import React, {FunctionComponent, useContext} from 'react';
import {Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import RenderHTML, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from 'react-native-render-html';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import {PaperDetailContext} from '@screens/PaperScreen/PaperContext';

interface Props {}

const renderers = {
  iframe: IframeRenderer,
};

const customHTMLElementModels = {
  iframe: iframeModel,
  input: defaultHTMLElementModels.input.extend({
    mixedUAStyles: {
      width: 150,
      height: 40,
      backgroundColor: 'yellow',
    },
    contentModel: HTMLContentModel.block, // change this from none to void
  }),
};
const Content: FunctionComponent<Props> = () => {
  const {paper: data} = useContext(PaperDetailContext);
  // {/* <RenderHTML contentWidth={Dimensions.get("screen").width} source={{ html }}></RenderHTML> */}
  return (
    <RenderHTML
      renderers={renderers}
      WebView={WebView}
      source={{html: data?.conten || ''}}
      contentWidth={Dimensions.get('screen').width}
      customHTMLElementModels={customHTMLElementModels}
      defaultWebViewProps={
        {
          /* Any prop you want to pass to all WebViews */
        }
      }
      renderersProps={{
        iframe: {
          scalesPageToFit: true,
          webViewProps: {
            /* Any prop you want to pass to iframe WebViews */
          },
        },
      }}
      // onPress={event => {
      //   return undefined;
      // }}
    />
  );
};

export default Content;
