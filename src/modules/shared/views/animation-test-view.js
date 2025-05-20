import FadeInSection from "../components/FadeInSection";
import ParallaxImage from "../components/ParallaxImage";
import PinSection from "../components/PinSection";
import ScaleOnScroll from "../components/ScaleOnScroll";
import SlideInFromLeft from "../components/SlideInFromLeft";
import TimelineSection from "../components/TimelineSection";


export default function AnimationTestView() {
  return (
    <>
      <FadeInSection />
      <SlideInFromLeft />
      <ScaleOnScroll />
      <ParallaxImage />
      <PinSection />
      <TimelineSection />
    </>
  )
}