FROM python:3.8

# add zimwriterfs
RUN wget http://download.openzim.org/release/zimwriterfs/zimwriterfs_linux-x86_64-1.3.9.tar.gz
RUN tar -C /usr/bin --strip-components 1 -xf zimwriterfs_linux-x86_64-1.3.9.tar.gz
RUN rm -f zimwriterfs_linux-x86_64-1.3.9.tar.gz
RUN chmod +x /usr/bin/zimwriterfs
RUN zimwriterfs --version

# Install necessary packages
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends locales-all wget unzip ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ted2zim /src/ted2zim
COPY requirements.txt setup.py README.md MANIFEST.in /src/
RUN pip3 install -r /src/requirements.txt
RUN cd /src/ && python3 ./setup.py install

CMD ["ted2zim", "--help"]
