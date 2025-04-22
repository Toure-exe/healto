import numpy as np
import wfdb
import scipy as sp
import neurokit2 as nk
from sklearn.preprocessing import MinMaxScaler

def high_pass_filter(original_signal, cutoff_frequency=0.5, sampling_rate=360, order=3):
  print("2")
  """
  Applies a high-pass Butterworth filter to the input signal.

  Parameters:
  - original_signal (array-like): the input signal to be filtered
  - cutoff_frequency (float, optional): the cutoff frequency of the high-pass filter in Hz (default 0.5 Hz)
  - sampling_rate (float, optional): the sampling rate of the signal in Hz (default 360 Hz)
  - order (int, optional): the order of the Butterworth filter (default 3)

  Returns:
  - filtered_signal (array-like): the filtered signal after applying the high-pass filter
  """
  nyquist = 0.5 * sampling_rate # Nyquist frequency
  normal_cutoff = cutoff_frequency / nyquist # Normalize the cutoff frequency with respect to the Nyquist frequency
  b, a = sp.signal.butter(order, normal_cutoff, btype='highpass', analog=False)
  filtered_signal = sp.signal.filtfilt(b, a, original_signal)
  return filtered_signal


def low_pass_filter(original_signal, cutoff_freq=150, sampling_rate=360, order=3):
  print("3")
  """
  Applies a low-pass Butterworth filter to the input signal.

  Parameters:
  - original_signal (array-like): the input signal to be filtered
  - cutoff_frequency (float, optional): the cutoff frequency of the high-pass filter in Hz (default 0.5 Hz)
  - sampling_rate (float, optional): the sampling rate of the signal in Hz (default 360 Hz)
  - order (int, optional): the order of the Butterworth filter (default 3)

  Returns:
  - filtered_signal (array-like): the filtered signal after applying the low-pass filter
  """
  nyquist = 0.5 * sampling_rate # Nyquist frequency
  normal_cutoff = cutoff_freq / nyquist # Normalize the cutoff frequency with respect to the Nyquist frequency
  b, a = sp.signal.butter(order, normal_cutoff, btype='low', analog=False)
  filtered_data = sp.signal.filtfilt(b, a, original_signal)
  return filtered_data

def notch_filter(signal, notch_frequency=60, quality_factor=30, sampling_rate=360):
  print("4")
  """
  Applies a notch filter to remove a specific frequency from the input signal.

  Parameters:
  - signal (array-like): the input signal to be filtered
  - notch_frequency (float, optional): the target frequency to be removed, in Hz (default 60 Hz)
  - quality_factor (float, optional): the quality factor of the notch filter, which determines
    the filter's bandwidth (default 30).
  - sampling_rate (float, optional): the sampling rate of the signal in Hz (default 360 Hz)

  Returns:
  - filtered_signal (array-like): the filtered signal after removing the specified frequency.
  """
  # Calculate the notch filter coefficients
  b, a = sp.signal.iirnotch(notch_frequency / (sampling_rate / 2), quality_factor)

  # Filters the signal to remove 60Hz interference
  return sp.signal.filtfilt(b, a, signal)


def signal_filtering(raw_signal):
  print("5")
  """
  Applies a series of filters (high-pass, notch, and low-pass) to a raw ECG signal.

  Parameters:
  - raw_signal: a NumPy array representing the raw ECG signal to be filtered

  Returns:
  - A NumPy array containing the filtered ECG signal after applying all three filters.
  """
  # High-pass filter
  filteredHighPassSignal = high_pass_filter(raw_signal)
  # Notch filter
  filteredNotchSignal = notch_filter(filteredHighPassSignal)
  # Low-pass filter
  return low_pass_filter(filteredNotchSignal)

def segmentation_process(signal, sampling_rate=360, window_size=0.6,
                         method="neurokit", correct_artifacts=True):
    print("6")
    """
    Segments a pre-filtered ECG signal into fixed-length windows centered on R-peaks.

    Parameters:
    - signal: NumPy array of the ECG signal (1D)
    - sampling_rate: Sampling rate of the signal (Hz), default is 360 for MIT-BIH
    - window_size: Total duration (in seconds) of each segment around R-peak (e.g., 0.6s)
    - method: R-peak detection method (e.g., 'neurokit', 'pan_tompkins', 'hamilton', 'christov', or 'auto')
    - correct_artifacts: Whether to attempt correction of missing/faulty peaks

    Returns:
    - segments: List of NumPy arrays, each of shape (window_samples,)
    """
    # Detect R-peaks (no additional filtering applied)
    peaks = nk.ecg_peaks(signal, sampling_rate=sampling_rate,
                        method=method, correct_artifacts=correct_artifacts)[1]
    rpeaks = peaks["ECG_R_Peaks"]
    print(f"Totale picchi R trovati: {len(rpeaks)}")

    half_window = int((window_size * sampling_rate) // 2)
    segments = []
    print("6 for")
    for r_index in rpeaks:
        start = r_index - half_window
        end = r_index + half_window
        if start >= 0 and end <= len(signal):
            segment = signal[start:end]
            segments.append(segment)
        else:
           print("ENTROOO")
    
    print(f"num segmenti: {len(segments)}")

    return segments

def normalization_process(raw_segments, scaler):
  print("7")
  """
  Normalizes each segment of the raw ECG signal using a specified scaler.

  Parameters:
  - raw_segments: a list of NumPy arrays, where each array represents a raw ECG segment
  - scaler: A scaler object (sklearn.preprocessing.MinMaxScaler) used to normalize each segment

  Returns:
  - normalized_beats: s list of NumPy arrays containing the normalized ECG segments
  """
  normalized_beats = []
  for raw_segment in raw_segments:
    # Describe what's happened here
    normalized_segment = scaler.fit_transform(np.array(raw_segment).reshape(-1, 1)).reshape(-1)
    normalized_beats.append(normalized_segment)

  return normalized_beats

def preprocessing(patient_record):
   print("1")
   scaler = MinMaxScaler(feature_range=(0, 1))
   sampling_rate = 360
   print("1 filter")
   filetred_first_lead_signal = signal_filtering(patient_record.p_signal[:, 0]) #first lead
   print("1 filer after")
   first_lead_raw_segments = segmentation_process(filetred_first_lead_signal, sampling_rate)
   first_lead_segments = normalization_process(first_lead_raw_segments, scaler)

   return first_lead_segments
   