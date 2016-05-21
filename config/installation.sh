sudo apt-get update
sudo apt-get -y install motion
sudo apt-get -y install mongodb-server
sudo mkdir -p /data/db
sudo chmod 0755 /data/db
sudo chown -R $USER /data/db
sudo cp -f ./config/motion.conf /etc/motion/motion.conf
sudo mkdir /home/motion/
sudo chmod 777 /home/motion/
sudo apt-get -y autoremove
sudo npm install -g grunt
npm install
mongod --shutdown
