/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        3.4: '12px',
        85: '292px',
      },
      maxHeight: {
        'screen-75': '75vh',
        'screen-80': '80vh',
        'screen-82': '82vh',
      },
      width: {
        1.9: '6px',
        85: '292px',
        444: '444px',
      },
    },
    colors: {
      'web-unifi-text-0': '#000000',
      'web-unifi-text-1': '#212327',
      'web-unifi-text-3': '#808893',
      'web-unifi-color-neutral-0': '#FFFFFF',
      'web-unifi-color-neutral-1': '#F9FAFA',
      'web-unifi-color-neutral-2': '#F4F5F6',
      'web-unifi-color-neutral-3': '#EDEDF0',
      'web-unifi-color-neutral-8': '#838691',
      'web-unifi-color-neutral-10': '#50565E',
      'web-unifi-color-ublue-06': '#006FFF',
    }
  },
  plugins: [],
}

