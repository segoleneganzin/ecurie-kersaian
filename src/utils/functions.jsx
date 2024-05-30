export const handleScroll = () => {
  const scrollPosition = window.scrollY;
  // Adjust this value based on the scroll position where you want the button to appear
  const showScrollButtonThreshold = 500;
  return scrollPosition > showScrollButtonThreshold;
};
