<?php

    /**
     * fix error of module: In18 
     * change text: compile -> implementation
     *  
     * @return void
     */
    function fixIn18Module()
    {
        try {
            $i18n_file = 'node_modules/react-native-i18n/android/build.gradle';
            $i18n_build_old = file_get_contents($i18n_file);
            file_put_contents($i18n_file, str_replace('compile ', 'implementation ', $i18n_build_old));
        } catch (\Throwable $th) {
            echo($th->getMessage()."\n");
        }
    }

    /**
     * fix error of show warning text about style decrepted.
     *
     * @return void
     */
    function fixErrorStyleMessage()
    {
        try {
            $decrepted_file = 'node_modules/react-native/index.js';
            $i18n_style_warning_old = file_get_contents($decrepted_file);
            file_put_contents($decrepted_file, preg_replace('/(console.error).*\s*.*\s*.*\s.*\s.*\s.*\s.*/', '', $i18n_style_warning_old));
        } catch (\Throwable $th) {
            echo($th->getMessage()."\n");
        }
    }

    /**
     * fix error of module: checkAppInstall in android
     * change content of file: android/build.gradle in this module.
     *
     * @return void
     */
    function fixCheckAppInstall()
    {
        try {
            $app_install_file = 'node_modules/react-native-check-app-install/android/build.gradle';
            $new_fix_conten = file_get_contents('src\doc\check_app_install_fix.md');
            file_put_contents($app_install_file, $new_fix_conten);
        } catch (\Throwable $th) {
            echo($th->getMessage()."\n");
        }
    }

    /**
     * fix for module react-native-color-picker decrepted
     *
     * @return void
     */
    function fixColorAndIcon()
    {
        try {

            $decrepted_file = 'node_modules/react-native-color-picker/dist/HoloColorPicker.js';
            $i18n_style_warning_old = file_get_contents($decrepted_file);
            if (strpos($i18n_style_warning_old, '@react-native-community/slider') === false) {
                $i18n_style_warning_old = str_replace('Slider,', '', $i18n_style_warning_old);
                $i18n_style_warning_old = str_replace('import React from "react";', 'import React from "react"; import Slider from "@react-native-community/slider";', $i18n_style_warning_old);

                file_put_contents($decrepted_file, $i18n_style_warning_old);
            }

            // ================tsx==========================
            $decrepted_file2 = 'node_modules/react-native-color-picker/src/HoloColorPicker.tsx';
            $i18n_style_warning_old2 = file_get_contents($decrepted_file2);
            if (strpos($i18n_style_warning_old2, '@react-native-community/slider') === false) {
                $i18n_style_warning_old2 = str_replace('Slider,', '', $i18n_style_warning_old2);
                $i18n_style_warning_old2 = str_replace('import React from "react"', 'import React from "react"; import Slider from "@react-native-community/slider";', $i18n_style_warning_old2);
    
                file_put_contents($decrepted_file2, $i18n_style_warning_old2);
            }
           
        } catch (\Throwable $th) {
            echo($th->getMessage()."\n");
        }
    }
    // =============fix run========================
    fixIn18Module();
    fixErrorStyleMessage();
    fixCheckAppInstall();
    fixColorAndIcon();

?>