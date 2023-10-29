from django import forms

TEXT_INPUT = 'ti'
NUMBER_INPUT = 'no'
EMAIL_INPUT = 'em'
PHONE_NUMBER_INPUT = 'ph'
DROP_DOWN_INPUT = 'dd'
SINGLE_SELECT_INPUT = 'ss'
MULTI_SELECT_INPUT = 'ms'
TEXT_AREA_INPUT = 'ta'

FORM_FIELD_CHOICES = (
    (TEXT_INPUT, 'Text Input'),
    (NUMBER_INPUT, 'Number Input'),
    (EMAIL_INPUT, 'Email'),
    (PHONE_NUMBER_INPUT, 'Phone Number'),
    (DROP_DOWN_INPUT, 'Drop Down'),
    (SINGLE_SELECT_INPUT, 'Single Select'),
    (MULTI_SELECT_INPUT, 'Multi Select'),
    (TEXT_AREA_INPUT, 'Text Area'),
)

FORM_FIELD_INPUTS = (
    (TEXT_INPUT, forms.CharField),
    (NUMBER_INPUT, forms.IntegerField),
    (EMAIL_INPUT, forms.EmailField),
    (PHONE_NUMBER_INPUT, forms.IntegerField),
    (DROP_DOWN_INPUT, forms.ChoiceField),
    (SINGLE_SELECT_INPUT, forms.ChoiceField),
    (MULTI_SELECT_INPUT, forms.MultipleChoiceField),
    (TEXT_AREA_INPUT, forms.CharField)
)

FORM_FIELD_INPUTS = dict(FORM_FIELD_INPUTS)

FORM_FIELD_WIDGETS = (
    (TEXT_INPUT, forms.TextInput),
    (TEXT_AREA_INPUT, forms.Textarea)
)

FORM_FIELD_WIDGETS = dict(FORM_FIELD_WIDGETS)
