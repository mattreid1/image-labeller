# Image Labeller
A simple web interface for labelling images for machine learning projects.

The web server and interface are run locally in a Docker container and so none of the image data ever leaves your local system.

No images are duplicated either. It simply moves the image files into folders in the output directory.

The unlabeled image input data should be just a folder full of images with no other directories inside (in the example below it's `~/Desktop/images`).

The output directory (in the example below it's `~/Desktop/output`) should be empty the first time you run the application. You can stop the container and start again at any point without losing your data, however.

## Setup
1. Install [Docker](https://docs.docker.com/engine/install/).
2. Download the image using `docker pull mattreid1/image-labeller`
3. Run `docker run -v ~/Desktop/images:/usr/src/app/static/images -v ~/Desktop/output:/usr/src/app/static/output -p 3000:3000 mattreid1/image-labeller` where `~/Desktop/images` is the unlabeled image data directory and `~/Desktop/output` is the output for this dataset.