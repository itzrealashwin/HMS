import { Lightbulb, Megaphone, Microscope, UsersRound, ShieldCheck, Globe } from "lucide-react";
import SSubB from "./SSubB.jsx";

export default function SecondB() {
    return (
        <div className="text-[#2D6A4F] font-semibold px-4 sm:px-6 lg:px-8">
            <h2 className="text-center my-10 text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-800">
                <span className="text-[#438B7B] mx-2 sm:mx-4">MedLife</span> Services & Solutions
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <SSubB
                    Icon={UsersRound}
                    heading="Equipping Stakeholders With New-Age Healthcare"
                    content="We understand the changing healthcare paradigm and build healthcare solutions that deliver impact - Solutions that bring a change and equip stakeholders to stay relevant in a fast-paced healthcare world. With a simple vision to build a full-fledged ecosystem, we are connecting the dots to elevate healthcare experiences and make them meaningful."
                />
                <SSubB
                    Icon={Lightbulb}
                    heading="Innovative Healthcare Solutions"
                    content="Embracing the latest advancements, we develop innovative healthcare solutions designed to tackle modern challenges. Our approach focuses on leveraging cutting-edge technology and creative thinking to revolutionize patient care and operational efficiency."
                />
                <SSubB
                    Icon={Microscope}
                    heading="Advanced Research and Development"
                    content="Our commitment to research drives the development of breakthrough healthcare technologies. We invest in rigorous scientific research and development to push the boundaries of what's possible, ensuring that our solutions are at the forefront of medical science."
                />
                <SSubB
                    Icon={Megaphone}
                    heading="Strategic Communication"
                    content="Effective communication is crucial for successful healthcare delivery. We focus on strategic communication that enhances stakeholder engagement and ensures that key messages are delivered clearly and effectively across all channels."
                />
                <SSubB
                    Icon={ShieldCheck}
                    heading="Robust Security Measures"
                    content="We prioritize the security of healthcare data with robust measures designed to protect patient information and comply with industry standards. Our solutions ensure that sensitive data is safeguarded against breaches and unauthorized access."
                />
                <SSubB
                    Icon={Globe}
                    heading="Global Reach and Impact"
                    content="Our solutions have a global perspective, aiming to address healthcare challenges across different regions. We strive to make a worldwide impact by adapting our strategies to meet diverse needs and expanding our reach beyond borders."
                />
            </div>
        </div>
    );
}
