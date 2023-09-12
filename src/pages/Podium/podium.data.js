import sevinch_certificate from "../../images/certificates/sevinch.png";
import javohir_certificate from "../../images/certificates/javohir.png";
import fayoziddin_certificate from "../../images/certificates/fayoziddin.png";
import komoliddin_certificate from "../../images/certificates/komoliddin.png";
import shoxdiyor_certificate from "../../images/certificates/shoxdiyor.png";
import muhammadamin_certificate from "../../images/certificates/muhammadamin.png";
import memories1 from "../../images/memories/gw-13/month1/memories1.jpg";
import memories2 from "../../images/memories/gw-13/month1/memories2.jpg";
import memories3 from "../../images/memories/gw-13/month1/memories3.jpg";

const winnersData = [
  {
    id: 1,
    classroomName: "GW-13",
    months: [
      {
        monthNum: 1,
        memories: [memories1, memories2, memories3],
        topStudents: [
          {
            fullName: "Sevinch Sayfutdinova",
            certificate: sevinch_certificate,
            coins: 215,
            rank: 1,
            avatar: "https://i.pinimg.com/564x/f7/0d/6c/f70d6c4271126184ce5cce40a53611a9.jpg"
          },
          {
            fullName: "Javohir Murodov",
            certificate: javohir_certificate,
            coins: 214,
            rank: 2,
            avatar: "https://i.pinimg.com/474x/88/b3/e4/88b3e42479fb2d3440681af9ef9ab95b.jpg"
          },
          {
            fullName: "Fayoziddin Appakxodjayev",
            certificate: fayoziddin_certificate,
            coins: 186,
            rank: 3,
            avatar: "https://img.freepik.com/premium-photo/very-cute-kid-caracter-animation-pixar-style_950002-73964.jpg"
          },
        ],
      },
      // {
      //   monthNum: 2,
      //   memories: [],
      //   topStudents: [
      //     {
      //       fullName: "Sevinch Sayfutdinova",
      //       certificate: sevinch_certificate,
      //       coins: 269,
      //       rank: 1,
      //       avatar: "https://i.pinimg.com/564x/f7/0d/6c/f70d6c4271126184ce5cce40a53611a9.jpg"
      //     },
      //     {
      //       fullName: "Javohir Murodov",
      //       certificate: javohir_certificate,
      //       coins: 225,
      //       rank: 2,
      //       avatar: "https://i.pinimg.com/474x/88/b3/e4/88b3e42479fb2d3440681af9ef9ab95b.jpg"
      //     },
      //     {
      //       fullName: "Shoxsulton Isoqov",
      //       certificate: fayoziddin_certificate,
      //       coins: 192,
      //       rank: 3,
      //       avatar: "https://i.pinimg.com/564x/0e/87/6e/0e876e130d0844af9105f05398a28abc.jpg"
      //     },
      //   ],
      // },
    ],
  },
  {
    id: 2,
    classroomName: "GW-15",
    months: [
      {
        monthNum: 1,
        memories: [],
        topStudents: [
          {
            fullName: "Komoliddin Zayniddinov",
            certificate: komoliddin_certificate,
            coins: 310,
            rank: 1,
            avatar: "https://i.pinimg.com/564x/f5/bc/31/f5bc31d68868b93ff33fe444babb3eef.jpg"
          },
          {
            fullName: "Shoxdiyor Shirinboyev",
            certificate: shoxdiyor_certificate,
            coins: 286,
            rank: 2,
            avatar: "https://i.pinimg.com/564x/0b/b4/10/0bb410482ac53dbfd80d571023af8f60.jpg"
          },
          {
            fullName: "MuhammadAmin Botirov",
            certificate: muhammadamin_certificate,
            coins: 197,
            rank: 3,
            avatar: "https://i.pinimg.com/564x/ef/91/b1/ef91b151821245ed97c4bcee71687a6f.jpg"
          },
        ],
      },
    ],
  },
];

export default winnersData;
