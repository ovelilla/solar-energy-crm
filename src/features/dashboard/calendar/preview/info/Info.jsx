import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import formatDate from "@features/dashboard/calendar/utils/formatDate";
import formatRecurring from "@features/dashboard/calendar/utils/formatRecurring";
import {
    Container,
    Header,
    Row,
    Left,
    Right,
    Title,
    Subtitle,
    Date,
    Recurring,
    Color,
    Label,
    Description,
} from "./styles";
import { AlignLeft, Calendar, PenToSquare } from "@icons";

const Info = () => {
    const { stateCalendar, stateLabel } = useCalendar();
    const { title, start, end, allDay, backgroundColor, extendedProps, _def } =
        stateCalendar.event.event;

    const date = formatDate(start, end, allDay);
    const isRecurring = _def.recurringDef;
    const recurring = isRecurring && formatRecurring(_def.recurringDef);

    return (
        <Container>
            <Header>
                <Row>
                    <Left></Left>
                    <Right>
                        <Title>{title}</Title>
                    </Right>
                </Row>

                <Row>
                    <Left>
                        <Calendar />
                    </Left>
                    <Right>
                        <Subtitle>
                            <Date>{date}</Date>
                            {isRecurring && <Recurring>{recurring}</Recurring>}
                        </Subtitle>
                    </Right>
                </Row>
            </Header>

            <Row>
                <Left>
                    <Color color={backgroundColor} />
                </Left>
                <Right>
                    <Label>{stateLabel.labels.find((label) => label._id === extendedProps.labelId).name}</Label>
                </Right>
            </Row>

            <Row>
                <Left>
                    <AlignLeft />
                </Left>
                <Right>
                    <Description>{extendedProps.description}</Description>
                </Right>
            </Row>
        </Container>
    );
};

export default Info;
