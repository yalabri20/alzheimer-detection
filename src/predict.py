import torch
from torchvision import transforms, models
from PIL import Image

# 🧠 Load model
def load_model(model_path="model.pth"):
    model = models.efficientnet_b0(pretrained=False)
    model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, 4)
    model.load_state_dict(torch.load(model_path, map_location="cpu"))
    model.eval()
    return model

# نفس preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.Grayscale(num_output_channels=3),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# 🧾 Classes
classes = [
    "Non Demented",
    "Very Mild Demented",
    "Mild Demented",
    "Moderate Demented"
]

# 🔮 Predict function
def predict(image_path):
    model = load_model()

    image = Image.open(image_path)
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    return classes[predicted.item()]

# 🧪 Test
if __name__ == "__main__":
    img_path = "test.jpg"
    result = predict(img_path)
    print(f"Prediction: {result}")
