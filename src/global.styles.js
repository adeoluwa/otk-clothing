import { createGlobalStyle } from 'styled-components';

/* A function that is being called. */
export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'open sans';
        padding: 20px 60px;

        @media screen and (max-width:800px){
            padding: 10px;
        }

          @media screen and (max-width:600px){
            padding: 10px;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }

    * {
        box-sizing: border-box;
    }


`;
