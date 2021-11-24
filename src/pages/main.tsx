import Header from '../components/Header/Header';
import Body from '../pages/body';
import Footer from '../components/Footer';


function Main() {

  return (
    <div className="App">
      <Header id="header" />
      <Body id="particle-bg" style={{minHeight:'75vh', background:'#000', color: '#fff'}} />
      <Footer />
    </div>
  );
}

export default Main;