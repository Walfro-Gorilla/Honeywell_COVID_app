import styLed from 'styled-components';

export const Video = styLed.div`
    video {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
    }
    canvas{
        display: none;
    }
`;

export const Container = styLed.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ScanMarker = styLed.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    alig-items: center;
    justify-content: center;

    .label{
        color:  #fff;
        font-size: 14px;
        font-style: italic;
        margin-top: 20px;
        text-align:center;        
    }
`; 