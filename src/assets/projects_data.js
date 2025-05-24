import cps_img from '../assets/cps.png'
import fnf_vid from '../assets/fight_and_furious.mp4'
import rr_vid from '../assets/rr.mp4'
import datapath_img from '../assets/datapath.png'
import quantum_img from '../assets/quantum.png'
import bookrec_img from '../assets/bookrec.png'
import frc2023 from '../assets/frc2023.mp4'
import frc2022 from '../assets/frc2022.mp4'
const projects_data = [
    {
        idx: 1,
        proj_name: "Crib Protective Services",
        proj_img: cps_img,
        proj_summary: "Infant monitoring system using TensorFlow audio analysis and motion detection",
        proj_link: "https://github.com/jen051/Hacklytics25",
    },
    {
        idx: 2,
        proj_name: "Fight and Furious",
        proj_video: fnf_vid,
        proj_summary: "Real-time pose analysis webapp for learning self defence, 2nd place overall @ HackGT 11",
        proj_link: "https://github.com/jen051/HackGTFinal2024"
    },
    {
        idx: 3,
        proj_name: "32-bit Datapath",
        proj_img: datapath_img,
        proj_summary: "Functional datapath built from scratch in CircuitSim",
        proj_link: ""
    },
    {
        idx: 4,
        proj_name: "Robotic Registers",
        proj_video: rr_vid,
        proj_summary: "GAN model that creates valid digital logic circuits, Intel Developer Cloud Award @ Hacklytics",
        proj_link:"https://github.com/jen051/Hacklytics2024"
    },
    {
        idx: 5,
        proj_name: "Quantum",
        proj_img: quantum_img,
        proj_summary: "2-player 2D platformer game, worked on platform physics",
        proj_link: "https://allisanlu.itch.io/quantum"
    },
    {
        idx:6,
        proj_name: "FRC 2023: Charged Up",
        proj_video: frc2023,
        proj_summary: "Enhanced competition robot with PID drivetrain and autonomous functions, won Autonomous Award sponsored by Ford.",
        proj_link: "https://www.youtube.com/watch?v=9EkHGf0aubk"
    },
    
    {
        idx: 7,
        proj_name: "Bookshelf",
        proj_img: bookrec_img,
        proj_summary: "Book review app with customized book recommendations built in Java ",
        proj_link: "https://github.com/jen051/CS30CapstoneProject"
    },
    {
        idx: 8,
        proj_name: "FRC 2022: Rapid React",
        proj_video:frc2022,
        proj_summary: "Competition robot with OpenMV object detection, won Creativity Award sponsored by Rockwell Automation",
        proj_link: "https://www.youtube.com/watch?v=6oQYGAbM1GU"
    }
]
export default projects_data