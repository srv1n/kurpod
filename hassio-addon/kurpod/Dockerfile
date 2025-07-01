FROM ghcr.io/srv1n/kurpod-server:latest

# Copy the run script for Home Assistant integration
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]