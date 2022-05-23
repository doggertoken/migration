import * as React from "react";

type Props = {
    src: string,
    fallbackSrc: string,
    placeholderColor?: string,
    className?: string,
    alt: string
}

type State = {
    src: string,
    errored: boolean,
    loaded: boolean,
    alt: string
}

export default class Image extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            src: props.src,
            errored: false,
            loaded: false,
            alt: props.alt
        };
    }

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: this.props.fallbackSrc,
                errored: true,
            });
        }
    }

    onLoad = () => {
        if(!this.state.loaded){
            this.setState({loaded: true});
        }
    }

    render() {
        let style = {
            backgroundColor: this.props?.placeholderColor || "white"
        };

        if(this.state.loaded){
            style.backgroundColor = "transparent";
        }

        return (
            <img
                style={style}
                onLoad={this.onLoad}
                onError={this.onError}
                {...this.props}
                src={this.state.src}
                alt={this.state.alt}
            />
        );
    }
}