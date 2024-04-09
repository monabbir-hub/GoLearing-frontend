import React, { Component } from "react";

export default class InstaFeedArea extends Component {
  render() {
    return (
      <div className="embedsocial-hashtag" data-ref={this.props.refId}>
        <a
          className="feed-powered-by-es feed-powered-by-es-slider-new"
          href="https://embedsocial.com/social-media-aggregator/"
          target="_blank"
          title="Widget by EmbedSocial"
        ></a>
      </div>
    );
  }
  componentDidMount() {
    (function (d, s, id) {
      var js;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://embedsocial.com/cdn/ht.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    })(document, "script", "EmbedSocialHashtagScript");
  }
}
