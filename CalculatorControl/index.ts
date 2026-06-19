import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class CalculatorControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container!: HTMLDivElement;
    private inputBox!: HTMLInputElement;

    private currentInput: string = "";
    private result: string = "";
    private notifyOutputChanged!: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;

        const wrapper = document.createElement("div");
        wrapper.className = "calc";

        this.inputBox = document.createElement("input");
        this.inputBox.readOnly = true;

        wrapper.appendChild(this.inputBox);

        const buttons = [
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+"
        ];

        buttons.forEach(btn => {
            const b = document.createElement("button");
            b.innerText = btn;
            b.onclick = () => this.onClick(btn);
            wrapper.appendChild(b);
        });

        this.container.appendChild(wrapper);
    }

    private onClick(value: string): void {

        if (value === "=") {
            try {
                this.result = eval(this.currentInput).toString();
                this.inputBox.value = this.result;
                this.currentInput = this.result;
                this.notifyOutputChanged();
            } catch {
                this.inputBox.value = "Error";
            }
            return;
        }

        this.currentInput += value;
        this.inputBox.value = this.currentInput;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // No need for logic here
    }

    public getOutputs(): IOutputs {
        return {
            value: this.result
        };
    }

    public destroy(): void {
        // cleanup
    }
}