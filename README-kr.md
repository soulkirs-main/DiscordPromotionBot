Discord Prmotion Bots 디스코드 홍보봇   **이봇은 오직 한국어만 지원합니다!**
=============
**챕터**                             
* 봇 커맨드들

  + 설정하기

    * 의사소통

---------------------------------------
+ **1. 봇 커맨드들**
---------------------------------------
|  <center>유저 커맨드들</center> |  <center>어드민 커맨드들</center> |  <center>개발자 커맨드들</center> |
|:--------|:--------:|--------:|
 |findserver |add  |category |
 |help | |compile |
 |botinfo | |compile2 |
 |ping |     |
---------------------------------------
+ **2. 설정하기**
---------------------------------------

>	>	>    필수:
>	>	>     Node.js 버전 12 이상
>	>	>     Mysql Regular(mysql 설치중 Reference Manual에서 설정가능),
>	>	>     자신의 클라이언트id,
>	>	>     봇토큰,
    
    
       1. DB와 Table만들기
       
> >       어떻게만드나요?
>	>	>       1.우선 mysql command line 을 켜주세요.
>	>	>       2.create database DBname; 를 입력합니다
>	>	>       3.그리고나서, 
>	>	>       create table tablename (data json); 를 입력합니다.[use사용하실줄 아시죠?]
>	>	>       4.
>	>	>       insert into tablename values('{"categorylist": []}'); 를 입력합니다
>	>	>               
       
          
   **2.**  config.example.js 를 config 로 수정합니다.
   
   
   
   **3.** 봇과 DB의 정보를 config.js 에 입력합니다.
   
   
   
  
   **4.** 터미널을 열고 npm i && node sharder 를 입력합니다.(디렉토리 설정하시는건 아시죠?) 또는  start.sh 를 엽니다.
   
   **5.** 만약 당신이 봇을 제대로 설정했다면, "[Kurasuta] [Cluster] Kurasuta Cluster ready!" 라는 말이 어떤 에러없이 나올겁니다
   
   ---------------------------------------
   + **3. 의사소통**
   ---------------------------------------
   
   [서포트 디스코드 채널](https://discord.gg/KpjwFRE)  
   
   개발자:Soulkirs.#4411
   
   ---------------------------------------
   만약 이말이 이해가안되셨다면... [봇을 초대하세요!](https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D638683182316650506%26permissions%3D8%26scope%3Dbot)   
   제 레포를 사용해주셔서 감사합니다.
   
  
