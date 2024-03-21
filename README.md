# cli6

    "clean-project": watchman watch-del-all && rm -rf node_modules && yarn cache clean && rm -rf ios/build && rm -rf ios/Podfile.lock && rm -rf package-lock.json && rm -rf yarn.lock && rm -rf ios/pods && rm -rf android/build && rm -rf android/app/build && rm -rf $TMPDIR/metro-*
