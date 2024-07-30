import { Card, CardMedia, Typography, Chip, Stack } from '@mui/material';


export default function ContactCard({ avatar, tags, firstName, lastName, email }) {
    return (
      <div>
        <p>
            {avatar}
            {/* {tags} */}
            {firstName}
            {lastName}
            {email}
        </p>
      </div>
    );
}