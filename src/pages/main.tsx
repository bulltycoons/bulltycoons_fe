import Header from '../components/Header/Header';
import Body from '../pages/body';
import Footer from '../components/Footer';


function Main() {

  return (
    <div className="App">
      <Header id="header" />
      <Body style={{minHeight:'75vh'}} />
      <Footer />
    </div>
  );
}

export default Main;