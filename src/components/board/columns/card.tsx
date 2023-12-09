import React, { FC, useEffect, useState } from 'react';
import { Box, Badge, Avatar, chakra } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CardDetail } from '@/src/types/cards';
import { useAppSelector } from '@/src/hooks';

type Props = {
  showCardDetail: (cardId: string) => void;
  cardIndex: number;
  card: CardDetail;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card }) => {
  const users = useAppSelector((state) => state.users.users);
  const [imageDataList, setImageDataList] = useState([]);

  useEffect(() => {
    // Parse the HTML string using a temporary div element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = card.description;

    // Extract image data from img tags
    const imgTags = tempDiv.getElementsByTagName('img');
    const imageDataArray = [];

    for (let i = 0; i < imgTags.length; i++) {
      const imgTag = imgTags[i];
      const srcAttribute = imgTag.getAttribute('src');
      imageDataArray.push(srcAttribute);
    }

    setImageDataList(imageDataArray);
  }, [card.description]);

  const loadAssignedToUser = () => {
    if (!card.assignedTo) return;

    const user = users.filter((user) => user._id === card.assignedTo);

    return (
      <Box display="flex" justifyContent="flex-end">
        <Avatar size="xs" name={user[0]?.fullName} />
      </Box>
    );
  };

  return (
    // https://github.com/atlassian/react-beautiful-dnd/issues/1767
    <Draggable draggableId={card._id} index={cardIndex} key={card._id}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          m="5px"
          p="10px"
          id={card._id}
          minHeight="80px"
          borderWidth="1px"
          bg="white"
          cursor="pointer"
          borderRadius="md"
          overflow="auto"
          _hover={{
            backgroundColor: 'lightblue'
          }}
          onClick={() => showCardDetail(card._id)}>
          {card.label && (
            <Badge bg={card.label.type} color="white">
              {card.label.type}
            </Badge>
          )}
          {imageDataList.length
            ? imageDataList.map((imageData, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img key={index} src={imageData} alt={`Image ${index + 1}`} />
              ))
            : null}
          <chakra.p>{card.title}</chakra.p>
          {loadAssignedToUser()}
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
