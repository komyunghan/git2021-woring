scp -i "c:\keyfile\myworkspace.pem" -r ./build/libs/*.jar ubuntu@ec2-3-38-98-212.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/myworkspace
scp -i "c:\keyfile\myworkspace.pem" -r ./run.sh ubuntu@ec2-3-38-98-212.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/app/myworkspace
