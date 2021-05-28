import "./styles.css";
import ContactList from "./components/ContactList";
import ContactContextProvider from "./contexts/ContactContext";

function App() {
  return (
    <main className='container'>
      <ContactContextProvider>
        <ContactList />
      </ContactContextProvider>
    </main>
  );
}

export default App;
