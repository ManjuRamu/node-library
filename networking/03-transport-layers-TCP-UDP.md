# Transport layers
Works with segments data transfer from point A to point B, adds some port number to pocket
 Cause:
  - Packet loss 
  - Duplicate pocket / retransmitting data
  - If destination goes offline 
  - Data loss or manipulation occurs in while transfers in a channel 

 This layer container TCP-UDP
 TCP: 
  - Taking care of receive all data sent without any loss and manipulation.
  - speed less than UPD
  - HTTP, SSH
 UDP:  
  - Not care about data loss 
   used in streams, voice call etc. even data loss there won't  
  - speed more than UPD 
  - datagram built on UDP

 TCP Headers:    
  ![alt text](https://github.com/ManjuRamu/node-library/public/git/images/TCP-Header.PNG?raw=true)
  - source port running on 
  - destination port
  - Sequence Number (brief not in dept): pockets are on          sequentially so they can find data loss, like 1,2,3
  - Acknowledge Number : What can be the next data pocket prediction
  - Other :
       Window size-> this will getting bigger and get threshold size,Ex: File 
                   download speed up.
       checksum ->  Helps find data is corrupted or not
  - Data : Optional, 

  UPD Headers: 
  - source port
  - destination port
  - segment length -> Moving data to transport layer
  - Checksum -> Helps find data is corrupted or not
  - Data -> Our data
  