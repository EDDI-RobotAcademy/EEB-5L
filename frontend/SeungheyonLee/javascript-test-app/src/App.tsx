import "./index.css";
import {Container, Typography} from "@mui/material";
import {CalculationExample} from "./math_operation/CalculationExample.tsx";
import {VariableAndDataTypes} from "./data_type/VariableAndDataTypes.tsx";
import {LogicalOperationExample} from "./Logical_operation/LogicalOperationExample.tsx";
import {TypeCoercion} from "./type_coercion/TypeCoercion.tsx";
import {ControlFlowIf} from "./control_flow/ControlFlowIf.tsx";
import {ControlFlowSwitch} from "./control_flow/ControlFlowSwitch.tsx";
import {ControlFlowFor} from "./control_flow/ControlFlowFor.tsx";
import {ControlFlowForEach} from "./control_flow/ControlFlowForEach.tsx";
import {MapExample} from "./map/MapExample.tsx";
import {FilterExample} from "./filter/FilterExample.tsx";
import {RegularExpression} from "./regular_expression/RegularExpression.tsx";
import {StringExample} from "./string_test/StringExample.tsx";
import {ArrayPushExample} from "./array/store/ArrayPushExample.tsx";
import {ArrayPopExample} from "./array/store/ArrayPopExample.tsx";
import {ArrayShiftExample} from "./array/store/ArrayShiftExample.tsx";
import {ArrayUnShiftExample} from "./array/store/ArrayUnShiftExample.tsx";
import {ArrayReduceExample} from "./array/ArrayReduceExample.tsx";
import {ArrayFindExample} from "./array/store/ArrayFindExample.tsx";
import {Number1} from "./quiz/quiz1/Number1.tsx";
import {Number2} from "./quiz/quiz1/Number2.tsx";
import {Number3} from "./quiz/quiz1/Number3.tsx";
import {ArrayIncludeExample} from "./array/store/ArrayIncludeExample.tsx";
import {ArrayIndexOfExample} from "./array/store/ArrayIndexOfExample.tsx";
import {ArraySliceExample} from "./array/store/ArraySliceExample.tsx";
import {ArraySortExample} from "./array/sort/ArraySortExample.tsx";
import {ArrayReverseExample} from "./array/sort/ArrayReverseExample.tsx";
import {ArrayEveryExample} from "./array/store/ArrayEveryExample.tsx";
import {ArrayFlatExample} from "./array/store/ArrayFlatExample.tsx";
import {Quiz2_Number1} from "./quiz/quiz2/Quiz2_Number1.tsx";
import {Quiz2_Number2} from "./quiz/quiz2/Quiz2_Number2.tsx";
import {Quiz2_Number3} from "./quiz/quiz2/Quiz2_Number3.tsx";

const App = () => {
    return (

        <Container maxWidth="md" sx={{padding: "32px 16px", textAlign: "left"}}>
            <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>
                JavaScript 필수 요소를 파악해보자!
            </Typography>

            {/*<CalculationExample/>*/}
            {/*<VariableAndDataTypes/>*/}
            {/*<LogicalOperationExample/>*/}
            {/*<TypeCoercion/>*/}
            {/*<ControlFlowIf/>*/}
            {/*<ControlFlowSwitch/>*/}
            {/*<ControlFlowFor/>*/}
            {/*<ControlFlowForEach/>*/}
            {/*<MapExample/>*/}
            {/*<FilterExample/>*/}
            {/*<StringExample/>*/}
            {/*<ArrayPushExample/>*/}
            {/*<ArrayPopExample/>*/}
            {/*<ArrayShiftExample/>*/}
            {/*<ArrayUnShiftExample/>*/}
            {/*<ArrayReduceExample/>*/}
            {/*<ArrayFindExample/>*/}
            {/*<Quiz2_Number1/>*/}
            {/*<Number2/>*/}
            {/*<Number3/>*/}
            {/*<ArrayIncludeExample/>*/}
            {/*<ArrayIndexOfExample/>*/}
            {/*<ArraySliceExample/>*/}
            {/*<ArraySortExample/>*/}
            {/*<ArrayReverseExample/>*/}
            {/*<ArrayEveryExample/>*/}
            {/*<ArrayFlatExample/>*/}
            <Quiz2_Number1/>
            <Quiz2_Number2/>
            <Quiz2_Number3/>
        </Container>
    )
}
export default App;