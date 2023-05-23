<template>
    <el-form :inline="false" :model="eduForm">
        <el-form-item label="个人简介" prop="desc">
            <el-input v-model="eduForm.biography" type="textarea" />
        </el-form-item>
        <el-form-item label="学术兼职" prop="desc">
            <el-input v-model="eduForm.parttime" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
            </el-tag>
            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + New Tag
            </el-button>
        </el-form-item>
        <el-form-item label="获奖信息" prop="desc">
            <el-input v-model="eduForm.award" type="textarea" />
        </el-form-item>
    </el-form>
    <div>
        教育经历
    </div>
    <div>
        <el-form :inline="true" :model="eduForm" class="demo-form-inline">
            <el-form-item>
                <div class="demo-date-picker">
                    <div class="block">
                        <el-date-picker v-model="value1" type="monthrange" range-separator="To"
                            start-placeholder="Start month" end-placeholder="End month" />
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-input v-model="eduForm.school" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="eduForm.major" />
            </el-form-item>
            <el-form-item>
                <el-select v-model="eduForm.degree">
                    <el-option label="学士" value="shanghai" />
                    <el-option label="硕士" value="beijing" />
                    <el-option label="博士" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">删除</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div>
        <el-button type="primary" @click="addItem">添加教育经历</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive ,nextTick } from 'vue'
import { ElInput } from 'element-plus'

const value1 = ref<[Date, Date]>([
    new Date(2000, 10, 10, 10, 10),
    new Date(2000, 10, 11, 10, 10),
])
const eduForm = reactive({
    biography: '',
    parttime: '',
    award: '',
    school: '',
    major: '',
    degree: '',
})
function addItem() {

}

const onSubmit = () => {
    console.log('submit!')
}

const inputValue = ref('')
const dynamicTags = ref()
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
  