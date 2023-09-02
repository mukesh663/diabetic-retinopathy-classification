import torch
import torch.nn as nn
from torchvision.transforms import transforms
from torchvision.models import resnet50
from PIL import Image


class DynamicConvAttn(nn.Module):
    """Dynamic Convolutional Attention layer."""
    
    def __init__(self, in_channels, out_channels, kernel_size, stride=1, padding=0, bias=True):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels, kernel_size, stride=stride, padding=padding, bias=bias)
        self.conv_att = nn.Conv2d(in_channels, 1, kernel_size, stride=stride, padding=padding, bias=bias)
        self.bn_att = nn.BatchNorm2d(1)
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, x):
        att = self.conv_att(x)
        att = self.bn_att(att)
        att = self.sigmoid(att)
        x = self.conv(x)
        x = x * att
        return x


class ResNet50WithDynamicConvAttn(nn.Module):
    """ResNet50 with Dynamic Convolutional Attention."""
    
    def __init__(self, num_classes=1000):
        super().__init__()
        self.resnet = resnet50(weights='ResNet50_Weights.IMAGENET1K_V1')
        self.dynamic_conv1 = DynamicConvAttn(64, 64, kernel_size=3, padding=1)
        self.linear = nn.Linear(2048, num_classes)
        
    def forward(self, x):
        x = self.resnet.conv1(x)
        x = self.resnet.bn1(x)
        x = self.resnet.relu(x)
        x = self.resnet.maxpool(x)
        x = self.dynamic_conv1(x)
        x = self.resnet.layer1(x)
        x = self.resnet.layer2(x)
        x = self.resnet.layer3(x)
        x = self.resnet.layer4(x)
        x = self.resnet.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.linear(x)
        return x
    
def predict_class(image):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = ResNet50WithDynamicConvAttn(num_classes=5)

    model.load_state_dict(torch.load('weights/resnet50_dynamicconvattn.pth', map_location=device))
    model.eval()

    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.ToTensor(),
    ])

    input_image = Image.open(image)
    input_tensor = transform(input_image).unsqueeze(0)

    output_tensor = model(input_tensor)
    output_array = output_tensor.detach().numpy()
    predicted_class_index = output_array.argmax()

    class_labels = ['No DR (0)', 'Mild (1)', 'Moderate (2)', 'Severe (3)', 'Proliferative DR (4)']
    predicted_class_label = class_labels[predicted_class_index]

    return predicted_class_label