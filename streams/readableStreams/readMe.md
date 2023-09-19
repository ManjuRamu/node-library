 ![alt text](https://github.com/ManjuRamu/CODODEV/public/git/images/Capture.PNG?raw=true)
 The buffer container array has invalid start and end element in 04-even-numbers-write.js
 Cause: 
  - It slices the binary data into buffer that time it slices the data.

 That buffer array continued number in next first element  
  ![alt text](https://github.com/ManjuRamu/CODODEV/public/git/images/sliced-data.PNG?raw=true)
 
 Invalid data stores in file:
  ![alt text](https://github.com/ManjuRamu/CODODEV/public/git/images/invalid-data-stores.PNG?raw=true)
  
example: 
 utf-8 1 char= 8 bits
 Buffer container stores:  uft-8 hex encoding data

for ex: 1 2 3 20, 1234 ==>  0000 0001 | 0000 0010 | 0000 0011 | 0000 0010, 0000 0000 | 0000 0001, 0000 0010, 0000 0011, 0000 0100 |
  buffer array = [01| 02| 03 |02 00 |01 02 03 04] so in streams it may slice like [00, 02,03, 01, 02  ]  [03,04 ....] here we can see  
  1234 slice as 12 and 34 separately 
here when we had continues string in file
1234 1678
it may slices like
Streams buffer container ==> [...., 123] , [4, 1678 ....]