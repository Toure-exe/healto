import torch.nn as nn

class LSTMModel(nn.Module):
  """
  A deep bidirectional LSTM model for sequence classification.
  This model consists of four bidirectional LSTM layers, each followed by batch normalization.
  A final fully connected layer performs probabilistic classification.

  Constructor method
    Parameters:
    - input_size (int): number of input features per time step
    - hidden_size1 (int): number of hidden units in each LSTM layer
    - num_classes (int): number of output classes
    - dropout_rate (float, optional): dropout probability applied before the final fully connected layer.
                                      (Default is 0.1)

  Forward method
    Parameter:
    - x (torch.Tensor): input tensor of shape (batch_size, sequence_length, input_size)

    Returns:
    - torch.Tensor: output tensor of shape (batch_size, num_classes), containing class logits before
                    applying softmax
  """
  def __init__(self, input_size, hidden_size1, num_classes, dropout_rate=0.1):
    super().__init__()

    # LSTM Layer 1
    self.lstm1 = nn.LSTM(input_size, hidden_size1, batch_first=True, bidirectional=True)
    self.batch_norm1 = nn.BatchNorm1d(2*hidden_size1)

    # LSTM Layer 2
    self.lstm2 = nn.LSTM(2*hidden_size1, hidden_size1, batch_first=True, bidirectional=True)
    self.batch_norm2 = nn.BatchNorm1d(2*hidden_size1)

    # LSTM Layer 3
    self.lstm3 = nn.LSTM(2*hidden_size1, hidden_size1, batch_first=True, bidirectional=True)
    self.batch_norm3 = nn.BatchNorm1d(2*hidden_size1)

    # LSTM Layer 4
    self.lstm4 = nn.LSTM(2*hidden_size1, hidden_size1, batch_first=True, bidirectional=True)
    self.batch_norm4 = nn.BatchNorm1d(2*hidden_size1)

    # Fully Connected Layer
    self.dropout = nn.Dropout(dropout_rate)
    self.fc = nn.Linear(2*hidden_size1, num_classes)

  def forward(self, x):
    # LSTM Layer 1
    x, _ = self.lstm1(x)  # Output shape: (batch_size, 200, hidden_size1)
    x = self.batch_norm1(x.permute(0, 2, 1)).permute(0, 2, 1)

    # LSTM Layer 2
    x, _ = self.lstm2(x)  # Output shape: (batch_size, 200, hidden_size1)
    x = self.batch_norm2(x.permute(0, 2, 1)).permute(0, 2, 1)

    # LSTM Layer 3
    x, _ = self.lstm3(x)  # Output shape: (batch_size, 200, hidden_size1)
    x = self.batch_norm3(x.permute(0, 2, 1)).permute(0, 2, 1)

    # LSTM Layer 4
    x, _ = self.lstm4(x)  # Output shape: (batch_size, 200, hidden_size1)
    x = self.batch_norm4(x.permute(0, 2, 1))#.permute(0, 2, 1)

    # Take the final time step output
    x = x[..., -1]  # Output shape: (batch_size, hidden_size1)

    # Fully Connected Layer
    x = self.dropout(x)
    x = self.fc(x)  # Output shape: (batch_size, num_classes)

    return x