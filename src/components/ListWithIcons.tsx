import React, { ReactElement } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

interface Icon {
  name: string;
  url: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: Icon;
}

interface ListWithIconsProps {
  list: Item[];
  className?: string;
  emptyList: ReactElement;
}

function ListWithIcons({ list, className, emptyList }: ListWithIconsProps) {
  return list.length > 0 ? (
    <List className={className}>
      {list.map((item, index) => (
        <Link to={item.url} state={{ data: item }} key={`item-${item.id}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.icon.name} src={item.icon.url} />
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
          {index + 1 < list.length && (
            <Divider variant="inset" component="li" />
          )}
        </Link>
      ))}
    </List>
  ) : (
    emptyList
  );
}

export default ListWithIcons;
