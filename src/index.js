import ReactDOM from "react-dom/client"
import App from "./App";
import "./index.css"

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <div>
        <main>
            <App />
        </main>
    </div>
)
