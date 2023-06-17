/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public/**/*.{html,js,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors :{
      // primary:'#0F172A',
      'primary':'#F8F8F8',
      'secondary':'#0a3449',
      'secondary':'#FFFFFF',
      'accent':'#0284C7',
      'dark' : '#34364A',
      'mute' : '#797A8A',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

