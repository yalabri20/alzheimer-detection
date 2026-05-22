import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import gradio as gr

# 🧠 Load model
def load_model():
    model = models.efficientnet_b0(pretrained=False)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, 4)
    model.load_state_dict(torch.load("model/model.pth", map_location="cpu"))
    model.eval()
    return model

model = load_model()

# 🔹 نفس preprocessing من المشروع
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

# 🔮 Prediction function
def predict(image):
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    return classes[predicted.item()]

# 🎨 Gradio UI
interface = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),
    outputs=gr.Label(),
    title="Alzheimer Disease Detection",
    description="Upload an MRI scan to classify Alzheimer stage"
)

# 🚀 Run
if __name__ == "__main__":
    interface.launch()
