import React from "react";
import { Hero } from "../Hero/Hero";
export const Results = props =>
  props.list.map(item => <Hero key={item.id} item={item} />);
