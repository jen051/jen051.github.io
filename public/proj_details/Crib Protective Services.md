## Project Overview
Crib Protective Services: the CPS you call so CPS doesn’t call you. This is a **digital baby monitor** designed to assist new parents in childcare.
### Main Features
- Custom AI model capable of quickly identifying the source of a child's discomfort when they're upset, trained using crying audio files from the [donate_a_cry dataset](https://github.com/gveres/donateacry-corpus).
- Motion tracking software that detects when the child could be in danger

## Personal Contributions
### Spectrogram creation for audio analysis
- Used the **librosa** library to load audio files and create mel-spectrograms, then rendering them as images using **Matplotlib**
### Image preprocessing & inference (analyze)

### Live audio recording

### Model deserialization (loaded_model = pickle.load(...))
- Used **pickle** to store the pre-trained model that will be invoked for inference.
### Minimal web interface (bottom section with streamlit.columns)

## Challenges
- Live audio input