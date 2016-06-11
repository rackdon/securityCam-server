#!/bin/bash

sudo apt-get update
if $USER -ne "motion"; then
  sudo mkdir /home/motion/
  sudo chmod 777 /home/motion/
fi
sudo mkdir -p /data/db
sudo chmod 0755 /data/db
sudo chown -R $USER /data/db
sudo apt-get -y install motion
sudo apt-get -y install mongodb-server
sudo cp -f ./config/motion.conf /etc/motion/motion.conf
sudo apt-get -y autoremove
sudo npm install -g grunt
mkdir ./test/testFiles
npm install
