import sevinch_certificate from "../../images/certificates/sevinch.png";
import javohir_certificate from "../../images/certificates/javohir.png";
import fayoziddin_certificate from "../../images/certificates/fayoziddin.png";
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
    ],
  },
];

export default winnersData;
