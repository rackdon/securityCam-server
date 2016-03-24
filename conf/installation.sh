sudo apt-get update
sudo apt-get -y install motion
sudo apt-get -y install mongodb
sudo cp -f ./motion.conf /etc/motion/motion.conf
sudo mkdir /home/motion/
sudo chmod 777 /home/motion/
