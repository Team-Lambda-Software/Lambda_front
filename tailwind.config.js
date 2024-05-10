/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#2D2D3A',
        'custom-light': '#F2F2F2',
        'custom-dark-purple': '#4F14A0',
        'custom-light-purple': '#8066FF',
        'custom-black': '#222222',
        'custom-light-dark': '#4E546A',
        'custom-ligth-gray': '#677294',
      },
    },
    backgroundImage: {
      'login-ligth': "url('assets/background/login-bg-ligth.png')",
      'login-dark': "url('assets/background/login-bg-dark.png')",
      'sign-up': "url('assets/background/signup-bg.png')",
      'main-bg': "url('assets/background/main-bg.png')",
      'reset-ligth': "url('assets/background/reset-bg-ligth.png')",
      'reset-dark': "url('assets/background/reset-bg-dark.png')",
      'verification-bg': "url('assets/background/verification-bg.png')",
      'createPassword-ligth': "url('assets/background/createPassword-bg-ligth.png')",
      'createPassword-dark': "url('assets/background/createPassword-bg-dark.png')",
      'passwordChange-bg': "url('assets/background/passwordChange-bg.png')",
      'custom-gradient-purple': 'linear-gradient(144.61deg, #4F14A0 3.01%, #8066FF 90.98%)',
      'splashScreen': "url('assets/background/splashScreen-bg.png')",

    }
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}

