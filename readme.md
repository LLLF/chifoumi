﻿# Chifoumi
## Summary
Rock–paper–scissors is a zero-sum hand game usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock" (✊ a simple fist), "paper" (✋ a flat hand), and "scissors" (✌️ a fist with the index and middle fingers together forming a V). The game has only three possible outcomes other than a tie: a player who decides to play rock will beat another player who has chosen scissors ("rock crushes scissors") but will lose to one who has played paper ("paper covers rock"); a play of paper will lose to a play of scissors ("scissors cut paper"). If both players choose the same shape, the game is tied and is usually immediately replayed to break the tie. Other names for the game in the English-speaking world include roshambo and other orderings of the three items, sometimes with "rock" being called "stone"

![chifoumi](http://patricerolland.free.fr/pic/chifoumi.jpg)

## Setup
- npm i
- ionic serve

## Android
- install android studio and install an android emulator
- cordova plugin add cordova-plugin-crosswalk-webview
- cordova platform add android --save
- ionic build android --release
- import platform directory in android studio
- cordova plugin add cordova-plugin-media
- ionic emulate android
- cordova run android --list
- cordova run android --device
You can add additional flags when using  ionic run.

-c will show console logs.
-s will show server logs.
-l will perform live reload of the application when code changes.
So you can use something like ionic run android -cls

Note that for livereload to work if the device is not connected directly make sure its in the same network as the serving device. Make sure to serve to a local IP address in this case (you can use ionic address to change that).


## Unit tests
- npm test
- http://lathonez.github.io/2016/ionic-2-unit-testing/

## Documentation
http://www.dailymotion.com/video/x16thfp_robot-imbattable-a-pierre-feuille-ciseaux_tech
http://ionicframework.com/docs/v2/
http://boulette.fr/jeu-Pierre-Feuille-Ciseaux-7551.html
https://developers.google.com/web/tools/chrome-devtools/remote-debugging/



