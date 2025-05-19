import cps_img from '../assets/cps.png'
import fnf_img from '../assets/fight_and_furious.png'
import rr_img from '../assets/rr.png'
import datapath_img from '../assets/datapath.png'
import quantum_img from '../assets/quantum.png'
import bookrec_img from '../assets/bookrec.png'
const projects_data = [
    {
        idx: 1,
        proj_name: "Fight and Furious",
        proj_img: fnf_img,
        proj_desc: "Real-time pose analysis webapp for learning self defence"
    },
    {
        idx: 2,
        proj_name: "Crib Protective Services",
        proj_img: cps_img,
        proj_desc: "Infant monitoring system using TensorFlow audio analysis and motion detection"
    },
    {
        idx: 3,
        proj_name: "Robotic Registers",
        proj_img: rr_img,
        proj_desc: "GAN model that creates valid digital logic circuits"
    },
    {
        idx: 4,
        proj_name: "32-bit Datapath",
        proj_img: datapath_img,
        proj_desc: "Functional datapath built from scratch in CircuitSim"
    },
    {
        idx: 5,
        proj_name: "Quantum",
        proj_img: quantum_img,
        proj_desc: "2-player 2D platformer game"
    },
    {
        idx: 6,
        proj_name: "Bookshelf",
        proj_img: bookrec_img,
        proj_desc: "Book review app with customized book recommendations built in Java "
    }
]
export default projects_data