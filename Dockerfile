FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY dist/prek-play/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
