ECHO 'Deployment Start'

set CurrentDir=D:\My_Projects\Screeps_\Screeps_
set TargetDir=C:\Users\Lscho\AppData\Local\Screeps\scripts\127_0_0_1___21025\default

IF NOT EXIST %TargetDir% GOTO NOWINDIR
ECHO 'Removing TargetDir'
del %TargetDir% /S /Q
rmdir /S /Q %TargetDir%
mkdir %TargetDir%
:NOWINDIR
mkdir %TargetDir%

xcopy /f/i/s/e/v/z %CurrentDir% %TargetDir%