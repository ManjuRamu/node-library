# IP-V4 address
32 bits binary
00000000.00000000.00000000.00000000 => 4 portions in IP
|   1   |   3    |   3    |    4  | portions
IP-V6 address
binary to decimal convert that is the IP address 
0.0.0.0 to 255.255.255.255 is the range of IP address


# **Parts of **
** 1. Network
 2. Host**
subnets mask decide which is network and host portion
subnets mask is also 32 bits like IP address
1 represents network portion 
2 represents host portion
Ex: 
  IP           11000000.10101000.00000110.00010011
  subnetMask   11111111.11111111.00000000.00000000 
  8 bits = one portion 
  first two portions are network 
  last two portion are host
Subnet structure   
 IP/no of ones in subnet mask 
 192.168.6.19/16 => first 16 bits for network last 16 for host
 ![alt text](https://github.com/ManjuRamu/node-library/blob/main/public/git/images/ip-v4.PNG?raw=true)

