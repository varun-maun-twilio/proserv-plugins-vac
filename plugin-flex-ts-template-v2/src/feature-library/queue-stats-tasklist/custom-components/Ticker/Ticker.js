import * as React from "react";
import { addTickListener, removeTickListener } from "./tick";

/**
 * Lifted from Flex monorepo
 */
class Ticker extends React.Component {

    constructor(props) {
        super(props);
       
      }

    tick = () => {
        this.forceUpdate();
    };

    componentDidMount() {
        addTickListener(this.tick);
    }

    componentWillUnmount() {
        removeTickListener(this.tick);
    }

    render() {        
        return this.props.children;
    }
}

export default Ticker;