// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Berry" width="100" />
     *
     */
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      width={140}
      height={32}
      viewBox="0 0 140 32"
    >
      <g>
        <g transform="translate(-55.876 -91.133) scale(.15193) translate(-1.092 -178.243) scale(1.25878) matrix(.37703 0 0 .37703 184.13 489.028)">
          <g fill="#292964">
            <path d="M734.981 616.353c4.016-36.753-5.637-73.738 12.046-110.26-74.727 20.632 6.702 172.923-173.961 184.616l.231 94.28 11.148-.677c.706-44.352 15.634-72.336 49.078-79.007 42.101-7.599 78.662-24.059 108.408-51.425 36.29-31.811 51.963-90.725 96.361-112.113-46.018-4.324-68.874 49.724-103.311 74.586zM398.877 616.353c-4.015-36.753 5.637-73.738-12.045-110.26 74.726 20.632-6.702 172.923 173.96 184.616l-.231 94.28-11.148-.677c-.706-44.352-15.634-72.336-49.077-79.007-42.101-7.599-78.663-24.059-108.408-51.425-36.29-31.811-51.964-90.725-96.362-112.113 46.018-4.324 68.874 49.724 103.311 74.586z" />
          </g>
          <path
            fill="#292964"
            d="M571.063 348.869c27.051 0 48.982 21.251 48.982 47.464 0 .254-.006.506-.01.76-4.837-21.284-24.414-37.211-47.833-37.211-26.79 0-48.554 20.841-48.973 46.703a46.227 46.227 0 01-1.149-10.252c0-26.213 21.93-47.464 48.983-47.464zM572.216 458.103c21.832 1.404 37.98 26.662 36.066 56.415-.018.289-.041.575-.063.862-2.35-24.41-16.987-43.504-35.887-44.719-21.62-1.391-40.706 21.136-42.932 50.468a73.064 73.064 0 01-.179-11.696c1.913-29.753 21.163-52.735 42.995-51.33zM655.211 413.085c20.031 17.948 18.957 56.183-2.4 85.399-.208.284-.417.561-.627.841 13.76-26.932 12.24-57.672-5.101-73.211-19.837-17.774-52.932-8.985-74.314 19.562a90.294 90.294 0 017.502-12.189c21.357-29.216 54.909-38.35 74.94-20.402z"
          />
          <path
            fill="#292964"
            d="M478.925 413.085c-20.031 17.948-18.956 56.183 2.401 85.399.207.284.417.561.626.841-13.76-26.932-12.24-57.672 5.101-73.211 19.837-17.774 52.933-8.985 74.314 19.562a90.092 90.092 0 00-7.502-12.189c-21.357-29.216-54.909-38.35-74.94-20.402z"
          />
          <path
            fill="#128A65"
            d="M503.801 523.861c-1.536-14.058 2.156-28.205-4.607-42.174 28.582 7.891-2.564 66.142 66.539 70.615l-.088 36.061-4.264-.258c-.271-16.965-5.98-27.669-18.772-30.221-16.104-2.906-30.088-9.202-41.466-19.669-13.881-12.168-19.876-34.702-36.858-42.883 17.602-1.654 26.344 19.019 39.516 28.529zM630.057 523.861c1.536-14.058-2.156-28.205 4.607-42.174-28.582 7.891 2.564 66.142-66.539 70.615l.089 36.061 4.264-.258c.27-16.965 5.98-27.669 18.772-30.221 16.103-2.906 30.088-9.202 41.465-19.669 13.881-12.168 19.876-34.702 36.858-42.883-17.602-1.654-26.344 19.019-39.516 28.529z"
          />
          <path
            fill="#D48B04"
            d="M621.378 592.714c25.932-30.55 37.952-61.278 41.994-88.946 4.967 35.148.2 70.693-19.556 95.57a166.149 166.149 0 01-22.438-6.624z"
          />
          <path
            fill="#F5AB1D"
            d="M659.343 655.886c2.657-22.613-3.014-38.837-12.427-52.189 22.026-28.359 23.068-61.451 19.556-95.571 31.522 42.376 50.681 116.471-7.129 147.76z"
          />
          <path
            fill="#F7C05B"
            d="M584.053 571.836c13.144 40.046 35.781 69.394 71.698 83.779 1.902-20.743-1.724-38.425-12.428-52.189-25.404-6.384-48.663-14.342-59.27-31.59z"
          />
          <path
            fill="#DBA33B"
            d="M604.259 652.921c-18.253-31.569-22.009-56.04-21.396-78.373 12.233 38.084 33.823 68.021 71.698 83.779-15.737 3.026-32.133 2.961-50.302-5.406z"
          />
          <path
            fill="#D48B04"
            d="M512.481 592.714c-25.933-30.55-37.953-61.277-41.994-88.946-4.968 35.149-.201 70.694 19.555 95.57a166.205 166.205 0 0022.439-6.624z"
          />
          <path
            fill="#F5AB1D"
            d="M474.515 655.886c-2.656-22.613 3.015-38.837 12.427-52.189-22.026-28.359-23.068-61.451-19.556-95.57-31.522 42.375-50.681 116.47 7.129 147.759z"
          />
          <path
            fill="#F7C05B"
            d="M549.805 571.836c-13.143 40.046-35.78 69.394-71.698 83.779-1.902-20.742 1.725-38.425 12.428-52.189 25.404-6.384 48.663-14.342 59.27-31.59z"
          />
          <path
            fill="#DBA33B"
            d="M529.599 652.921c18.253-31.568 22.01-56.04 21.396-78.372-12.233 38.083-33.823 68.02-71.698 83.778 15.737 3.027 32.133 2.961 50.302-5.406z"
          />
        </g>
        <text
          x="0"
          y="0"
          fill="#D1911B"
          fontFamily="'CanelaText-Regular', 'Canela Text'"
          fontSize="100"
          transform="translate(-55.876 -91.133) scale(.15193) translate(71.323 -95.225) scale(1.12917) translate(555.01 735.271)"
        >
          e
        </text>
        <text
          x="0"
          y="0"
          fill="#D1911B"
          fontFamily="'CanelaText-Regular', 'Canela Text'"
          fontSize="100"
          transform="translate(-55.876 -91.133) scale(.15193) translate(71.323 -95.225) scale(1.12917) translate(555.01 735.271) translate(52.9)"
        >
          -
        </text>
        <g>
          <text
            x="0"
            y="0"
            fill="#292964"
            fontFamily="'CanelaText-Regular', 'Canela Text'"
            fontSize="100"
            transform="translate(-55.876 -91.133) scale(.15193) translate(71.323 -95.225) scale(1.12917) translate(641.71 738.821)"
          >
            s
          </text>
          <text
            x="0"
            y="0"
            fill="#292964"
            fontFamily="'CanelaText-Regular', 'Canela Text'"
            fontSize="100"
            transform="translate(-55.876 -91.133) scale(.15193) translate(71.323 -95.225) scale(1.12917) translate(641.71 738.821) translate(45)"
          >
            e
            <tspan x="50.4px 75.7px 129.3px 188.3px 224.1px 275.5px 313.1px" y="0px 0px 0px 0px 0px 0px 0px">
              jahtera
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
