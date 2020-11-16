DROP DATABASE IF EXISTS envizo;
CREATE DATABASE envizo;

\c envizo;

CREATE TABLE communities (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password_digest VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  community_id INT REFERENCES communities(id),
  avatar_img VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  description VARCHAR,
  title VARCHAR,
  community_id INT REFERENCES communities(id),
  target_value INT,
  completed BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  goal_id INT REFERENCES goals(id),
  user_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(goal_id, user_id)
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  img_url VARCHAR,
  goal_id INT REFERENCES goals(id),
  user_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  type VARCHAR,
  user_id INT REFERENCES users(id),
  subscription_id INT REFERENCES subscriptions(id) ON DELETE CASCADE,
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- communities
INSERT INTO communities(name)
VALUES ('Manhattan'),('Queens'),('Bronx'),('Brooklyn'),
('Staten Island');
-- users
INSERT INTO users(username, password_digest, email, community_id, avatar_img)
VALUES
('Mitejada','$2a$10$nv25B38zarRD5e3eeykARuuqpJIz.4HN3zQyFlbxfgHd2MSUev3.W','mitejada2011@gmail.com',1,'data:image/png;base64,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'),
('xpectro','$2a$10$NeZucEU3D64.whR3vjb6HuyzkeR.KKLbz5GI6mAqNBr.I74vfSmVO','jon',2,'https://robohash.org/leme'),
('Aaron','$2a$10$8rNBAb1X4j1IsbTqruVEUOTQdH3K.encsFnhivAyLiubEO9Eo1uQO','aaron@a.com',1,'https://robohash.org/user4'),
('Rayliss','$2a$10$WLv5oi0tnd6DkloGqfcsDewdUEytex55ZSdA71tt2d1GFqggoT0ey','ray@ray.com',1,'https://robohash.org/user5'),
('Juju','$2a$10$34E1XRa6mSsMGloExL9DBOVfrQUNsyzrOIbOF5g0m5oEtBksPPTsa','Juju@ju.com',1,'https://robohash.org/user3'),
('Aiden','$2a$10$v.8andXAHBpHV1.dOimiH.a7F3EPOWX.rdlQV768eP59zZAl7BYFC','aiden@a.com',1,'https://robohash.org/user2'),
('Emma','$2a$10$Qvfcs5VD/W2TRMdxagjXXuY36IOKGqZswDKLwQM3rd/RIEy7SmM5y','Emma@em.com',1,'https://robohash.org/user1'),
('Bluebadger','$2a$10$eWMRaEPk2Xt9lbUdXZ2dgeXpjjyDDwbz7Q4VqxVEttUR6sKU509nS','badger@blue.com',1,'https://robohash.org/bby'),
('Ilana','$2a$10$nRzfcT4ggIRAiHH3i99DLOOEpotpW8iZXa25uJpZ1YUeKV3kb.6i2','ilana',2,'https://robohash.org/missye'),
('Shaggy','$2a$10$hzsd8I/j5w5yV6ZekugJiuvI7DEIsgCwnnJPSXlHNfXgZLxh0ph9W','doo@scooby',2,'https://i.kym-cdn.com/entries/icons/facebook/000/026/067/271.jpg'),
('Leo','$2a$10$its.GUhVKVE.xvDXulukQOnRSOjL0jJMJ5y5PoVZWdWUsV9BKzgLu','leo@pursuit.org',5,'https://robohash.org/ninja2'),
('Leo1','$2a$10$RGiPoSPzTJik62Ic27EvUe3BxpX2xBbk735WMg9n0OgcYhKeZRa/a','lu@gmail.com',5,'https://robohash.org/14f'),
('Jason','$2a$10$C79S7Uk9XvPm/roo3Z4kfuR7BswfIClk7hYTevazyDW2AYeqXt0EC','jason@gmail.com',5,'https://robohash.org/758'),
('GreenGiant','$2a$10$s6MYcvmCCLy4zpbjci9uO.21DgEZVGyhkD97YkO6iQ0Jsj/I66mVS','leolu@gmail.com',5,'https://robohash.org/216'),
('CeleryBoi','$2a$10$6Vk9Ynryjy5jqkhFsDAqLeg7POYHgMNce4KblCIhMrLl6iZRkbLcm','lereo3@gmail.com',5,'https://robohash.org/le1'),
('GreatMartha','$2a$10$hkOL8pbotDCs.B0gI8eifuWL2hMnLMP/8hUqPGI2ws5rKkc6rkxni','wer@gmail.com',5,'https://robohash.org/le2'),
('SofiaLuv','$2a$10$k4OPpfIip7ilhZiZVcZg6uY2x.auvPQr71A2mi7LjJrlN7RAQ3h82','er@gmail.com',5,'https://robohash.org/sofialuv'),
('Dylan','$2a$10$5b3j5LKtqPpYmNSGGLZkru49Hq0U42CR5ZYgXDMXUKtmqYXohR1hi','dylan@d.com',3,'https://robohash.org/buser1'),
('Logan','$2a$10$W589P/USxcgVjeN25IcI..DmPlJN.8nAVkGtSunCK3onU7.qeV2um','Logan@l.com',3,'https://robohash.org/buser12'),
('Raphy','$2a$10$LrS5Jz8tpITEJyAS1IlbaO0B6o2KZFCtq3Jai95od5bPUSVUBB8Dq','Raphy@r.com',3,'https://robohash.org/buser13'),
('Melanie','$2a$10$C/VFAkeHFH9RH6rus5/tael23W1wOjc1u//AkdLjeqMiI.2tFy.zW','melanie@m.com',3,'https://robohash.org/buser14'),
('Miguel','$2a$10$1VUx9LMEmWRaW5CPSI/SpOSs0FX6wQZXCB/hWj8xJRRVbdTVElmNi','miguel@m.com',3,'https://robohash.org/buser15'),
('dudette','$2a$10$lWpPUnoNLP.D6NNBMFVWr.Q4T6QnysHTnzDiNqDerbBA/rrTepPI.','ther@resa.org',2,'https://robohash.org/resa'),
('Bilbo','$2a$10$Wqi284.7tqhZLxwsiu8gD.b084jXkSSOmcILg5tdvXRyh.8NptR1i','Bilbo@baggings.com',1,'https://robohash.org/cowboy'),
('Leo10','$2a$10$D8SCugnOrsQm9kbG8S6RzODM2.s7gXR5WxwjTsnEDaS5QNhH0fUvG','leo10@gmail.com',1,'https://robohash.org/leo10'),
('Leo11','$2a$10$g43fiQak7MDybvq5UObSauvLH45WNaUuneLOUDbFB3XKZekuRo.Zq','leo11',1,'https://robohash.org/bag10'),
('AKIAX7PA4OK5NUZFVHZC','$2a$10$kt94z76X.B38kbFAITwDU.JbAE0HP9Dyi70bfqqGxusFCCQMcBowK','alex+envizo@alexquick.com',4,'https://robohash.org/ddogg'),
('Yari','$2a$10$/yDp4UNFrNArwhhz6eb1jeSMewiEqgQFBvbrFqkpb7ANuH/Yx58Ja','Yari@y.com',3,'https://robohash.org/yari');

-- goals
INSERT INTO goals(description, title, community_id, target_value, completed)
VALUES
('Take a picture of your reusable bag after you have gone shopping. @$Reusable bags look great, don''t rip, and carry lots of stuff. Keep a box of them near your front door so you remember to take them to the store. It''s surprisingly convenient! @$Keep the Sky and the Sea Plastic free','Reusable Grocery Bag',1,500,false),
('Take a picture of your reusable bag after you have gone shopping. @$Reusable bags look great, don''t rip, and carry lots of stuff. Keep a box of them near your front door so you remember to take them to the store. It''s surprisingly convenient! @$Keep the Sky and the Sea Plastic free','Reusable Grocery Bag',2,500,false),
('Take a picture of your reusable bag after you have gone shopping. @$Reusable bags look great, don''t rip, and carry lots of stuff. Keep a box of them near your front door so you remember to take them to the store. It''s surprisingly convenient! @$Keep the Sky and the Sea Plastic free','Reusable Grocery Bag',3,500,false),
('Take a picture of your reusable bag after you have gone shopping. @$Reusable bags look great, don''t rip, and carry lots of stuff. Keep a box of them near your front door so you remember to take them to the store. It''s surprisingly convenient! @$Keep the Sky and the Sea Plastic free','Reusable Grocery Bag',4,500,false),
('Take a picture of your reusable bag after you have gone shopping. @$Reusable bags look great, don''t rip, and carry lots of stuff. Keep a box of them near your front door so you remember to take them to the store. It''s surprisingly convenient! @$Keep the Sky and the Sea Plastic free','Reusable Grocery Bag',5,500,false),
('Take a picture of the recycling bin in your area. @$You know the three R''s (Reduce, Reuse and Recycle). But do you know how powerful they can be? The average New Yorker throws out nearly 4.5 pounds of waste each year. If we can remember our Rs, we can lower that number and stop overcrowding our landfills. @$Feed your recycling bin - it is hungry.','Recycle',1,500,false),
('Take a picture of the recycling bin in your area. @$You know the three R''s (Reduce, Reuse and Recycle). But do you know how powerful they can be? The average New Yorker throws out nearly 4.5 pounds of waste each year. If we can remember our Rs, we can lower that number and stop overcrowding our landfills. @$Feed your recycling bin - it is hungry.','Recycle',2,500,false),
('Take a picture of the recycling bin in your area. @$You know the three R''s (Reduce, Reuse and Recycle). But do you know how powerful they can be? The average New Yorker throws out nearly 4.5 pounds of waste each year. If we can remember our Rs, we can lower that number and stop overcrowding our landfills. @$Feed your recycling bin - it is hungry.','Recycle',3,500,false),
('Take a picture of the recycling bin in your area. @$You know the three R''s (Reduce, Reuse and Recycle). But do you know how powerful they can be? The average New Yorker throws out nearly 4.5 pounds of waste each year. If we can remember our Rs, we can lower that number and stop overcrowding our landfills. @$Feed your recycling bin - it is hungry.','Recycle',4,500,false),
('Take a picture of the recycling bin in your area. @$You know the three R''s (Reduce, Reuse and Recycle). But do you know how powerful they can be? The average New Yorker throws out nearly 4.5 pounds of waste each year. If we can remember our Rs, we can lower that number and stop overcrowding our landfills. @$Feed your recycling bin - it is hungry.','Recycle',5,500,false),
('Take a picture of your reusable water bottle or glass of water. @$NYC tap water is about the best in the country -- pure, clean, and refreshing. It''s also better for your wallet, health, and planet than bottled water. @$Drink up pristine water from the Catskill Mountains FOR FREE.','Drink Tap Water',1,500,false),
('Take a picture of your reusable water bottle or glass of water. @$NYC tap water is about the best in the country -- pure, clean, and refreshing. It''s also better for your wallet, health, and planet than bottled water. @$Drink up pristine water from the Catskill Mountains FOR FREE.','Drink Tap Water',2,500,false),
('Take a picture of your reusable water bottle or glass of water. @$NYC tap water is about the best in the country -- pure, clean, and refreshing. It''s also better for your wallet, health, and planet than bottled water. @$Drink up pristine water from the Catskill Mountains FOR FREE.','Drink Tap Water',3,500,false),
('Take a picture of your reusable water bottle or glass of water. @$NYC tap water is about the best in the country -- pure, clean, and refreshing. It''s also better for your wallet, health, and planet than bottled water. @$Drink up pristine water from the Catskill Mountains FOR FREE.','Drink Tap Water',4,500,false),
('Take a picture of your reusable water bottle or glass of water. @$NYC tap water is about the best in the country -- pure, clean, and refreshing. It''s also better for your wallet, health, and planet than bottled water. @$Drink up pristine water from the Catskill Mountains FOR FREE.','Drink Tap Water',5,500,false);
-- subscriptions
INSERT INTO subscriptions(goal_id, user_id, created_at)
VALUES
(1, 6, '2019-05-09 19:06:13.879373'),
(12, 7, '2019-05-09 19:07:14.273244'),
 (7,14, '2019-05-09 19:28:42.100436'),
(12,15, '2019-05-09 20:46:06.612533'),
 (2,14, '2019-05-09 20:50:29.647704'),
 (7, 7, '2019-05-09 20:56:58.47817'),
 (2,15, '2019-05-09 21:00:46.997571'),
 (6, 6, '2019-05-10 00:00:00.095866'),
(11, 6, '2019-05-10 00:00:29.676139'),
 (1,11, '2019-05-10 00:02:22.314402'),
 (6,11, '2019-05-10 00:02:27.04041'),
(11,11, '2019-05-10 00:02:32.121115'),
 (6, 9, '2019-05-10 00:04:18.78321'),
(11, 9, '2019-05-10 00:04:21.043509'),
 (8,26, '2019-05-10 00:05:02.681247'),
 (3,27, '2019-05-10 00:06:06.533989'),
(10,16, '2019-05-10 16:16:23.655371'),
(15,16, '2019-05-10 16:16:31.184155'),
 (5,16, '2019-05-10 16:16:49.555446'),
 (6,12, '2019-05-10 16:17:20.446124'),
 (7,15, '2019-05-10 16:21:18.243815'),
 (6, 8, '2019-05-11 04:20:07.46331'),
 (1, 8, '2019-05-11 04:20:23.517082'),
 (3,26, '2019-05-11 04:22:01.006904'),
(13,26, '2019-05-11 04:22:14.992231'),
 (2, 7, '2019-05-13 05:24:56.918526');

-- submissions
INSERT INTO submissions(img_url, goal_id, user_id, created_at)
VALUES
('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-water-bottles-1556763931.png?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*' ,12 , 7 , '2019-05-09 19:24:20.092046'),
 ('https://i.pinimg.com/originals/64/5d/24/645d24629f35ef03a8038485d75109a7.jpg' , 7 ,14 , '2019-05-09 19:28:55.482228'),
 ('https://i.pinimg.com/originals/4f/c3/ac/4fc3ac6a3ee58f94bf30fd7d62a839e1.jpg',12 ,15 , '2019-05-09 20:47:06.890075'),
 ('https://ih1.redbubble.net/image.896626484.8799/ssrco,tote,cotton,canvas_creme,lifestyle,tall_portrait,750x1000-bg,f8f8f8.1.jpg', 2 ,14 , '2019-05-09 20:52:02.491431'),
 ('https://i.pinimg.com/474x/91/1d/67/911d67d421d44acb77a4e2351ced0492.jpg', 7 ,14 , '2019-05-09 20:55:53.329689'),
 ('https://i.pinimg.com/originals/64/5d/24/645d24629f35ef03a8038485d75109a7.jpg', 7 , 7 , '2019-05-09 20:57:28.007255'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxqphTQBrLf1ss-32_iEEt5BEsIvaCRudUcw&usqp=CAU', 2 ,15 , '2019-05-09 21:01:49.217759'),
 ('https://i.pinimg.com/474x/91/1d/67/911d67d421d44acb77a4e2351ced0492.jpg' , 7 ,15 , '2019-05-10 16:24:39.752669'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkbZrTFc6HiYWkBWLULvRaAhHwseEwQP0x-A&usqp=CAU',10 ,16 , '2019-05-10 16:24:54.071251'),
 ('https://i.pinimg.com/474x/ff/01/02/ff0102456b4ee41f2a6b6870629ab49c.jpg' ,10 ,16 , '2019-05-10 16:25:02.940919'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxQfPavQQsEvdEozo8NBthQjwE5g8Ee17s-A&usqp=CAU',10 ,16 , '2019-05-10 16:25:17.965511'),
 ('https://greendiary.com/wp-content/uploads/2013/12/455053891.jpg' ,10 ,16 , '2019-05-10 16:25:26.459303'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkbZrTFc6HiYWkBWLULvRaAhHwseEwQP0x-A&usqp=CAU',10 ,16 , '2019-05-10 16:25:36.984907'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ8rvlj4yiDoYs8Ww2YvTHZRCfabdIOncCKQ&usqp=CAU' ,10 ,16 , '2019-05-10 16:25:42.646095'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ8rvlj4yiDoYs8Ww2YvTHZRCfabdIOncCKQ&usqp=CAU' ,10 ,16 , '2019-05-10 16:25:48.666327'),
 ('https://greendiary.com/wp-content/uploads/2013/12/455053891.jpg' ,10 ,16 , '2019-05-10 16:25:52.59047'),
 ('https://greendiary.com/wp-content/uploads/2013/12/455053891.jpg' ,10 ,16 , '2019-05-10 16:26:06.933283'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ8rvlj4yiDoYs8Ww2YvTHZRCfabdIOncCKQ&usqp=CAU' ,10 ,16 , '2019-05-10 16:26:16.388496'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJ8rvlj4yiDoYs8Ww2YvTHZRCfabdIOncCKQ&usqp=CAU' ,10 ,16 , '2019-05-10 16:26:21.343916'),
 ('https://fastly.4sqi.net/img/general/600x600/3632605_xuJzjfTySR5OVhT4YbeohvQSLOzMUoL-Weeh2Sm93Po.jpg',10 ,16 , '2019-05-10 16:26:26.844183'),
 ('https://i.pinimg.com/originals/4f/c3/ac/4fc3ac6a3ee58f94bf30fd7d62a839e1.jpg',15 ,16 , '2019-05-10 16:28:26.711989'),
('https://i.pinimg.com/originals/05/d0/21/05d0212a4c18f275100ce5d551ef6d91.jpg',15 ,16 , '2019-05-10 16:28:37.026956'),
('https://i.pinimg.com/originals/4f/c3/ac/4fc3ac6a3ee58f94bf30fd7d62a839e1.jpg',15 ,16 , '2019-05-10 16:28:42.12023'),
('https://i.pinimg.com/originals/05/d0/21/05d0212a4c18f275100ce5d551ef6d91.jpg',15 ,16 , '2019-05-10 16:28:48.510485'),
('https://i.pinimg.com/originals/4f/c3/ac/4fc3ac6a3ee58f94bf30fd7d62a839e1.jpg' ,15 ,16 , '2019-05-10 16:28:53.506065'),
('https://i.pinimg.com/originals/05/d0/21/05d0212a4c18f275100ce5d551ef6d91.jpg' ,15 ,16 , '2019-05-10 16:28:58.745166'),
('https://i.pinimg.com/originals/4f/c3/ac/4fc3ac6a3ee58f94bf30fd7d62a839e1.jpg',15 ,16 , '2019-05-10 16:29:02.984047'),
('https://i.pinimg.com/originals/05/d0/21/05d0212a4c18f275100ce5d551ef6d91.jpg',15 ,16 , '2019-05-10 16:29:11.131043'),
('https://ih1.redbubble.net/image.896626484.8799/ssrco,tote,cotton,canvas_creme,lifestyle,tall_portrait,750x1000-bg,f8f8f8.1.jpg' , 3 ,27 , '2019-05-10 16:29:57.759027'),
('https://ih1.redbubble.net/image.896626484.8799/ssrco,tote,cotton,canvas_creme,lifestyle,tall_portrait,750x1000-bg,f8f8f8.1.jpg', 5 ,16 , '2019-05-10 16:30:42.821027'),
('https://i.pinimg.com/474x/ff/01/02/ff0102456b4ee41f2a6b6870629ab49c.jpg' , 5 ,16 , '2019-05-10 16:30:52.25824'),
('https://i.pinimg.com/474x/ff/01/02/ff0102456b4ee41f2a6b6870629ab49c.jpg' , 5 ,16 , '2019-05-10 16:33:57.70481'),
('https://ih1.redbubble.net/image.896626484.8799/ssrco,tote,cotton,canvas_creme,lifestyle,tall_portrait,750x1000-bg,f8f8f8.1.jpg', 5 ,16 , '2019-05-10 16:34:06.64334'),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxqphTQBrLf1ss-32_iEEt5BEsIvaCRudUcw&usqp=CAU' , 5 ,16 , '2019-05-10 16:34:11.796841'),
 ('https://fastly.4sqi.net/img/general/600x600/3632605_xuJzjfTySR5OVhT4YbeohvQSLOzMUoL-Weeh2Sm93Po.jpg' , 6 , 8 , '2019-05-11 04:19:17.1277'),
 ('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxqphTQBrLf1ss-32_iEEt5BEsIvaCRudUcw&usqp=CAU' , 1 , 8 , '2019-05-11 04:20:35.606704');

INSERT INTO activity(type, user_id, subscription_id, time_stamp)
VALUES
('joined' , 6 ,NULL, '2019-05-09 19:00:03.485026'),
 ('joined' , 7 ,NULL, '2019-05-09 19:00:59.165289'),
 ('subscribed' , 6 , 1 , '2019-05-09 19:06:13.883552'),
 ('subscribed' , 7 , 2 , '2019-05-09 19:07:14.276347'),
 ('joined' , 8 ,NULL, '2019-05-09 19:12:05.075121'),
 ('joined' , 9 ,NULL, '2019-05-09 19:15:32.263439'),
 ('joined' ,10 ,NULL, '2019-05-09 19:16:29.539707'),
 ('joined' ,11 ,NULL, '2019-05-09 19:16:59.309969'),
 ('joined' ,12 ,NULL, '2019-05-09 19:17:34.637531'),
 ('joined' ,13 ,NULL, '2019-05-09 19:26:05.9235'),
 ('joined' ,14 ,NULL, '2019-05-09 19:28:23.832472'),
 ('subscribed' ,14 , 3 , '2019-05-09 19:28:42.102907'),
 ('joined' ,15 ,NULL, '2019-05-09 19:49:28.264635'),
 ('joined' ,16 ,NULL, '2019-05-09 19:54:12.245933'),
 ('joined' ,17 ,NULL, '2019-05-09 19:57:35.10129'),
 ('joined' ,18 ,NULL, '2019-05-09 19:58:39.967019'),
 ('joined' ,19 ,NULL, '2019-05-09 19:59:18.449645'),
 ('joined' ,20 ,NULL, '2019-05-09 20:00:04.715643'),
 ('joined' ,21 ,NULL, '2019-05-09 20:00:33.710805'),
 ('joined' ,22 ,NULL, '2019-05-09 20:01:13.301601'),
 ('joined' ,23 ,NULL, '2019-05-09 20:14:02.49491'),
 ('joined' ,24 ,NULL, '2019-05-09 20:14:56.207075'),
 ('joined' ,25 ,NULL, '2019-05-09 20:15:59.144892'),
 ('joined' ,26 ,NULL, '2019-05-09 20:16:49.217514'),
 ('joined' ,27 ,NULL, '2019-05-09 20:17:28.814972'),
 ('subscribed' ,15 , 4 , '2019-05-09 20:46:06.615762'),
 ('subscribed' ,14 , 5 , '2019-05-09 20:50:29.650539'),
 ('subscribed' , 7 , 6 , '2019-05-09 20:56:58.481378'),
 ('subscribed' ,15 , 7 , '2019-05-09 21:00:47.003949'),
 ('joined' ,28 ,NULL, '2019-05-09 21:47:55.460891'),
 ('subscribed' , 6 ,10 , '2019-05-09 23:59:58.070028'),
 ('subscribed' , 6 ,11 , '2019-05-10 00:00:00.099397'),
 ('subscribed' , 6 ,12 , '2019-05-10 00:00:03.252674'),
 ('subscribed' , 6 ,14 , '2019-05-10 00:00:29.68096'),
 ('subscribed' ,11 ,15 , '2019-05-10 00:02:22.316723'),
 ('subscribed' ,11 ,16 , '2019-05-10 00:02:27.042967'),
 ('subscribed' ,11 ,17 , '2019-05-10 00:02:27.044425'),
 ('subscribed' ,11 ,18 , '2019-05-10 00:02:32.124019'),
 ('subscribed' ,11 ,19 , '2019-05-10 00:02:32.126201'),
 ('subscribed' , 9 ,25 , '2019-05-10 00:04:18.787093'),
 ('subscribed' , 9 ,26 , '2019-05-10 00:04:21.046536');
