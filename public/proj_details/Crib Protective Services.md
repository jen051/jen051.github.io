## Project Overview
Crib Protective Services: the CPS you call so CPS doesn’t call you. This is a **digital baby monitor** designed to assist new parents in childcare.

## Main Features
- Custom AI model capable of quickly identifying the source of a child's discomfort when they're upset.
- Motion tracking software that detects when the child could be in danger.

## Personal Contributions
### Model Creation
- Created the custom AI model by training on 600+ crying audio files from the [donate_a_cry dataset](https://github.com/gveres/donateacry-corpus).
### Model deserialization
- Used **pickle** to store the pre-trained model that will be invoked for inference.
### Spectrogram creation for audio analysis
- Used the **librosa** library to load audio files and create mel-spectrograms, then rendering them as images using **Matplotlib**
### Image preprocessing & inference (analyze)
- Used **numpy** to convert images to arrays, then analyze and catagorize using **TensorFlow**
### Live audio recording
- Used **pyaudio** to extract live microphone input
### Motion tracking
- Used **OpenCV** to detect and highlight large movements, indicating when the child may be climbing out of the crib, or in dangerous areas.
### Bridging backend & frontend
- Used **StreamLit** and port forwarding to connect the backend program to frontend web display